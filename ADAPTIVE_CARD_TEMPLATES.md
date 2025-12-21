# Adaptive Card Templates & Examples

This file contains additional Adaptive Card templates that you can use to extend the chat agent functionality.

## Basic Input Types

### Text Input Card
```javascript
{
  id: 'textField',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'Question text here?',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.Text',
      id: 'textField',
      placeholder: 'Enter your answer',
      isRequired: true
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'textField' }
    }
  ]
}
```

### Multi-line Text Input
```javascript
{
  id: 'comments',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'Please share your thoughts',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.Text',
      id: 'comments',
      placeholder: 'Enter your comments here...',
      isMultiline: true,
      isRequired: true
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Submit',
      data: { field: 'comments' }
    }
  ]
}
```

### Number Input
```javascript
{
  id: 'age',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'What is your age?',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.Number',
      id: 'age',
      placeholder: 'Enter your age',
      min: 18,
      max: 100,
      isRequired: true
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'age' }
    }
  ]
}
```

### Date Input
```javascript
{
  id: 'birthdate',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'What is your birth date?',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.Date',
      id: 'birthdate',
      isRequired: true
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'birthdate' }
    }
  ]
}
```

### Time Input
```javascript
{
  id: 'preferredTime',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'What time works best for you?',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.Time',
      id: 'preferredTime',
      isRequired: true
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'preferredTime' }
    }
  ]
}
```

## Choice Inputs

### Single Choice (Radio Buttons)
```javascript
{
  id: 'experience',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'How much experience do you have?',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.ChoiceSet',
      id: 'experience',
      style: 'expanded', // Shows as radio buttons
      isRequired: true,
      choices: [
        { title: 'Less than 1 year', value: 'beginner' },
        { title: '1-3 years', value: 'intermediate' },
        { title: '3-5 years', value: 'advanced' },
        { title: '5+ years', value: 'expert' }
      ]
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'experience' }
    }
  ]
}
```

### Dropdown Selection
```javascript
{
  id: 'country',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'Which country are you from?',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.ChoiceSet',
      id: 'country',
      style: 'compact', // Shows as dropdown
      isRequired: true,
      choices: [
        { title: 'United States', value: 'us' },
        { title: 'United Kingdom', value: 'uk' },
        { title: 'Canada', value: 'ca' },
        { title: 'Australia', value: 'au' },
        { title: 'Other', value: 'other' }
      ]
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'country' }
    }
  ]
}
```

### Multiple Choice (Checkboxes)
```javascript
{
  id: 'interests',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'What are your interests? (Select all that apply)',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.ChoiceSet',
      id: 'interests',
      style: 'expanded',
      isMultiSelect: true, // Allows multiple selections
      isRequired: true,
      choices: [
        { title: 'Technology', value: 'tech' },
        { title: 'Sports', value: 'sports' },
        { title: 'Music', value: 'music' },
        { title: 'Travel', value: 'travel' },
        { title: 'Reading', value: 'reading' }
      ]
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'interests' }
    }
  ]
}
```

## Toggle/Boolean Input

```javascript
{
  id: 'newsletter',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'Newsletter Subscription',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'Input.Toggle',
      id: 'newsletter',
      title: 'Subscribe to our newsletter?',
      value: 'false',
      valueOn: 'true',
      valueOff: 'false'
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'newsletter' }
    }
  ]
}
```

## Advanced Cards

### Card with Image
```javascript
{
  id: 'welcome',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'Image',
      url: 'https://example.com/logo.png',
      size: 'Medium',
      horizontalAlignment: 'Center'
    },
    {
      type: 'TextBlock',
      text: 'Welcome!',
      weight: 'Bolder',
      size: 'Large',
      horizontalAlignment: 'Center'
    },
    {
      type: 'TextBlock',
      text: 'Please provide your information to continue.',
      wrap: true,
      horizontalAlignment: 'Center'
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Get Started',
      data: { field: 'welcome' }
    }
  ]
}
```

### Card with Multiple Fields
```javascript
{
  id: 'contactInfo',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'Contact Information',
      weight: 'Bolder',
      size: 'Medium'
    },
    {
      type: 'TextBlock',
      text: 'First Name',
      size: 'Small'
    },
    {
      type: 'Input.Text',
      id: 'firstName',
      placeholder: 'Enter first name',
      isRequired: true
    },
    {
      type: 'TextBlock',
      text: 'Last Name',
      size: 'Small'
    },
    {
      type: 'Input.Text',
      id: 'lastName',
      placeholder: 'Enter last name',
      isRequired: true
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Next',
      data: { field: 'contactInfo' }
    }
  ]
}
```

### Confirmation Card with Choices
```javascript
{
  id: 'confirmation',
  type: 'AdaptiveCard',
  version: '1.3',
  body: [
    {
      type: 'TextBlock',
      text: 'Confirm Your Information',
      weight: 'Bolder',
      size: 'Large'
    },
    {
      type: 'FactSet',
      facts: [
        { title: 'Name:', value: '${name}' },
        { title: 'Email:', value: '${email}' },
        { title: 'Phone:', value: '${phone}' }
      ]
    },
    {
      type: 'TextBlock',
      text: 'Is this information correct?',
      weight: 'Bolder'
    },
    {
      type: 'Input.ChoiceSet',
      id: 'confirm',
      style: 'expanded',
      choices: [
        { title: 'Yes, submit', value: 'yes' },
        { title: 'No, let me edit', value: 'no' }
      ]
    }
  ],
  actions: [
    {
      type: 'Action.Submit',
      title: 'Continue',
      data: { field: 'confirmation' }
    }
  ]
}
```

## Styling Options

### Text Block Styles
```javascript
{
  type: 'TextBlock',
  text: 'Your text here',
  
  // Weight options
  weight: 'Default',  // or 'Lighter', 'Bolder'
  
  // Size options
  size: 'Default',    // or 'Small', 'Medium', 'Large', 'ExtraLarge'
  
  // Color options
  color: 'Default',   // or 'Dark', 'Light', 'Accent', 'Good', 'Warning', 'Attention'
  
  // Alignment
  horizontalAlignment: 'Left',  // or 'Center', 'Right'
  
  // Other properties
  wrap: true,         // Allow text wrapping
  maxLines: 3,        // Maximum lines before truncation
  isSubtle: false     // Lighter text appearance
}
```

## Implementation Tips

### Adding a New Card to ChatAgent.js

1. **Define the card** in the `adaptiveCards` array:
```javascript
const adaptiveCards = [
  // ... existing cards ...
  {
    id: 'yourNewCard',
    type: 'AdaptiveCard',
    version: '1.3',
    body: [
      // Your card content
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Next',
        data: { field: 'yourFieldName' }
      }
    ]
  }
];
```

2. **Update the render logic** (if using custom input types):
```javascript
if (element.type === 'Input.Number') {
  return (
    <input
      key={idx}
      type="number"
      name={element.id}
      min={element.min}
      max={element.max}
      required={element.isRequired}
      className="card-input"
    />
  );
}
```

3. **Update Excel headers** in `server/server.js`:
```javascript
const worksheetData = [
  ['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Position', 'YourNewField']
];
```

4. **Update column widths**:
```javascript
worksheet['!cols'] = [
  { wch: 20 }, // Timestamp
  { wch: 25 }, // Name
  // ... other columns ...
  { wch: 20 }  // Your new field
];
```

## Complete Example: Event Registration Form

```javascript
const eventRegistrationCards = [
  {
    id: 'welcome',
    type: 'message',
    message: "🎉 Welcome to our event registration! Let's get you signed up."
  },
  {
    id: 'fullName',
    type: 'AdaptiveCard',
    version: '1.3',
    body: [
      {
        type: 'TextBlock',
        text: 'What is your full name?',
        weight: 'Bolder',
        size: 'Medium'
      },
      {
        type: 'Input.Text',
        id: 'fullName',
        placeholder: 'Enter your full name',
        isRequired: true
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Next',
        data: { field: 'fullName' }
      }
    ]
  },
  {
    id: 'email',
    type: 'AdaptiveCard',
    version: '1.3',
    body: [
      {
        type: 'TextBlock',
        text: 'What is your email address?',
        weight: 'Bolder',
        size: 'Medium'
      },
      {
        type: 'Input.Text',
        id: 'email',
        placeholder: 'name@example.com',
        style: 'Email',
        isRequired: true
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Next',
        data: { field: 'email' }
      }
    ]
  },
  {
    id: 'attendeeType',
    type: 'AdaptiveCard',
    version: '1.3',
    body: [
      {
        type: 'TextBlock',
        text: 'What type of attendee are you?',
        weight: 'Bolder',
        size: 'Medium'
      },
      {
        type: 'Input.ChoiceSet',
        id: 'attendeeType',
        style: 'compact',
        isRequired: true,
        choices: [
          { title: 'Speaker', value: 'speaker' },
          { title: 'Attendee', value: 'attendee' },
          { title: 'Sponsor', value: 'sponsor' },
          { title: 'Volunteer', value: 'volunteer' }
        ]
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Next',
        data: { field: 'attendeeType' }
      }
    ]
  },
  {
    id: 'dietaryRestrictions',
    type: 'AdaptiveCard',
    version: '1.3',
    body: [
      {
        type: 'TextBlock',
        text: 'Do you have any dietary restrictions?',
        weight: 'Bolder',
        size: 'Medium'
      },
      {
        type: 'Input.Text',
        id: 'dietaryRestrictions',
        placeholder: 'Vegetarian, Vegan, Gluten-free, etc.',
        isMultiline: true
      }
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Submit',
        data: { field: 'dietaryRestrictions' }
      }
    ]
  },
  {
    id: 'complete',
    type: 'message',
    message: "✅ Registration complete! We look forward to seeing you at the event!"
  }
];
```

---

## Resources

- **Official Adaptive Cards Documentation**: https://adaptivecards.io/
- **Schema Explorer**: https://adaptivecards.io/explorer/
- **Designer Tool**: https://adaptivecards.io/designer/
- **Samples**: https://adaptivecards.io/samples/

---

Use these templates as a starting point to create your own custom chat agent flows!
