import React, { useState, useRef, useEffect } from 'react';
import { storage, db, auth } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { AuthModal } from '../ui';
import '../../styles/blog.css';

const VideoUploadFirebase = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const fileInputRef = useRef(null);

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                loadVideos(currentUser.uid);
            } else {
                setUser(null);
                setUploadedVideos([]);
            }
        });
        return () => unsubscribe();
    }, []);

    // Load videos from Firestore
    const loadVideos = async (userId) => {
        try {
            const videosRef = collection(db, 'videos');
            const q = query(videosRef, where('userId', '==', userId), orderBy('uploadDate', 'desc'));
            const querySnapshot = await getDocs(q);
            const videos = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUploadedVideos(videos);
        } catch (error) {
            console.error('Error loading videos:', error);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        validateAndSetFile(file);
    };

    const validateAndSetFile = (file) => {
        if (file && file.type.startsWith('video/')) {
            // Check file size (max 100MB for free tier)
            if (file.size > 100 * 1024 * 1024) {
                alert('Video file is too large. Maximum size is 100MB.');
                return;
            }
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            alert('Please select a valid video file.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        validateAndSetFile(file);
    };

    const handleUpload = async () => {
        if (!user) {
            setAuthMode('signup');
            setIsAuthModalOpen(true);
            return;
        }
        
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const timestamp = Date.now();
            const fileName = `video_${timestamp}_${selectedFile.name}`;
            const storageRef = ref(storage, `videos/${user.uid}/${fileName}`);

            // Upload file with progress tracking
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Progress tracking
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Upload error:', error);
                    alert('Failed to upload video. Please try again.');
                    setIsUploading(false);
                },
                async () => {
                    // Upload completed successfully
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // Save metadata to Firestore
                    await addDoc(collection(db, 'videos'), {
                        userId: user.uid,
                        originalName: selectedFile.name,
                        fileName: fileName,
                        size: selectedFile.size,
                        type: selectedFile.type,
                        downloadURL: downloadURL,
                        uploadDate: new Date().toISOString(),
                    });

                    alert('Video uploaded successfully!');
                    
                    // Reload videos
                    await loadVideos(user.uid);
                    
                    // Reset form
                    handleRemove();
                    setIsUploading(false);
                    setUploadProgress(0);
                }
            );
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Failed to upload video. Please try again.');
            setIsUploading(false);
        }
    };

    const handleDownloadVideo = (video) => {
        const a = document.createElement('a');
        a.href = video.downloadURL;
        a.download = video.originalName;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleDeleteVideo = async (video) => {
        if (!window.confirm('Are you sure you want to delete this video?')) {
            return;
        }

        try {
            // Delete from Storage
            const storageRef = ref(storage, `videos/${user.uid}/${video.fileName}`);
            await deleteObject(storageRef);

            // Delete from Firestore
            await deleteDoc(doc(db, 'videos', video.id));

            // Reload videos
            await loadVideos(user.uid);
            alert('Video deleted successfully!');
        } catch (error) {
            console.error('Error deleting video:', error);
            alert('Failed to delete video. Please try again.');
        }
    };

    const handleRemove = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <section className="video-upload-section">
            <div className="container">
                <div className="video-upload-card">
                    <div className="card-header">
                        <h3>Share Your Insight</h3>
                        <p>Upload videos permanently to cloud storage (Max 100MB per video)</p>
                        {user ? (
                            <p className="user-id">Logged in as: {user.email || user.uid.substring(0, 8) + '...'}</p>
                        ) : (
                            <div className="auth-prompt">
                                <p className="auth-message">Please log in to upload videos</p>
                                <div className="auth-buttons-inline">
                                    <button 
                                        className="btn btn-secondary login-btn-inline"
                                        onClick={() => {
                                            setAuthMode('login');
                                            setIsAuthModalOpen(true);
                                        }}
                                    >
                                        Login
                                    </button>
                                    <button 
                                        className="btn btn-primary signup-btn-inline"
                                        onClick={() => {
                                            setAuthMode('signup');
                                            setIsAuthModalOpen(true);
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        className={`upload-area ${isDragging ? 'dragging' : ''} ${previewUrl ? 'has-content' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {previewUrl ? (
                            <div className="video-preview-container">
                                <video src={previewUrl} controls className="video-preview" />
                                <button className="remove-btn" onClick={handleRemove}>×</button>
                            </div>
                        ) : (
                            <div className="upload-placeholder" onClick={() => fileInputRef.current.click()}>
                                <div className="upload-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                </div>
                                <p>Drag & drop or Click to Browse</p>
                                <span className="file-hint">Supports MP4, WebM up to 100MB</span>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="video/*"
                            style={{ display: 'none' }}
                        />
                    </div>

                    {isUploading && (
                        <div className="upload-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                            </div>
                            <p className="progress-text">{Math.round(uploadProgress)}% Uploaded</p>
                        </div>
                    )}

                    <div className="card-actions">
                        <button
                            className="btn-primary upload-btn"
                            onClick={handleUpload}
                            disabled={!selectedFile || isUploading}
                        >
                            {isUploading ? 'Uploading...' : 'Upload to Cloud'}
                        </button>
                    </div>
                </div>

                <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                    initialMode={authMode}
                />

                {/* Display uploaded videos list */}
                {uploadedVideos.length > 0 && (
                    <div className="uploaded-videos-box">
                        <div className="uploaded-videos-header">
                            <h3>📹 Uploaded Videos ({uploadedVideos.length})</h3>
                            <p>Your videos are stored permanently in the cloud</p>
                        </div>
                        <div className="videos-list">
                            {uploadedVideos.map((video) => (
                                <div key={video.id} className="video-list-item">
                                    <div className="video-player-section">
                                        <video 
                                            controls 
                                            className="video-thumbnail"
                                            src={video.downloadURL}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="video-info-section">
                                        <div className="video-item-header">
                                            <span className="video-index">☁️ Cloud</span>
                                            <span className="video-date">
                                                {new Date(video.uploadDate).toLocaleString()}
                                            </span>
                                        </div>
                                        <h4 className="video-filename">{video.originalName}</h4>
                                        <p className="video-indexed-name">Stored as: {video.fileName}</p>
                                        <p className="video-size">Size: {(video.size / (1024 * 1024)).toFixed(2)} MB</p>
                                        
                                        <div className="video-actions">
                                            <button 
                                                className="btn-download"
                                                onClick={() => handleDownloadVideo(video)}
                                                title="Download video"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="7 10 12 15 17 10" />
                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                </svg>
                                                Download
                                            </button>
                                            <button 
                                                className="btn-delete"
                                                onClick={() => handleDeleteVideo(video)}
                                                title="Delete video"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default VideoUploadFirebase;
