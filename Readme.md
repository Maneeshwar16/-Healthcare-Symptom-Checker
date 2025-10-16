# Healthcare Symptom Checker

A comprehensive AI-powered symptom checker application that helps users identify potential health conditions based on their symptoms. This tool provides preliminary health information and guidance, but should not replace professional medical advice.

## Features

- **AI-Powered Analysis**: Uses LLM technology for intelligent symptom analysis
- **Interactive Interface**: Easy-to-use web interface for symptom input
- **Safety Validation**: Built-in safety checks for input validation
- **Real-time Results**: Instant analysis and recommendations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Privacy-Focused**: Secure handling of health information

## Technology Stack

- **Backend**: Node.js with Express
- **Frontend**: HTML5, CSS3, JavaScript
- **AI Integration**: LLM (Large Language Model)
- **Safety**: Input validation and content filtering

## Project Structure

```
UNTHINKABLE/
├── .qodo/                  # Qodo configuration
├── node_modules/           # Dependencies
├── public/                 # Frontend files
│   └── index.html         # Main web interface
├── src/                   # Backend source files
│   ├── llm.js            # LLM integration logic
│   ├── safety.js         # Safety and validation
│   └── server.js         # Express server
├── package.json          # Project dependencies
└── package-lock.json     # Locked dependency versions
```

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/symptom-checker.git
cd UNTHINKABLE
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
PORT=3000
LLM_API_KEY=your_api_key_here
NODE_ENV=development
```

4. **Start the server**
```bash
npm start
```

5. **Access the application**
Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Open the Application**: Navigate to the web interface
2. **Describe Symptoms**: Enter your symptoms in the input field
3. **Get Analysis**: Submit for AI-powered analysis
4. **Review Results**: Read through potential conditions and recommendations
5. **Follow Guidance**: Take appropriate action based on severity

## API Endpoints

### `POST /api/analyze`
Analyzes symptoms and returns potential conditions

**Request Body:**
```json
{
  "symptoms": "headache, fever, fatigue",
  "duration": "2 days",
  "severity": "moderate"
}
```

**Response:**
```json
{
  "conditions": [...],
  "recommendations": [...],
  "severity": "moderate",
  "urgent": false
}
```

## Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)
- `LLM_API_KEY` - API key for LLM service
- `NODE_ENV` - Environment (development/production)
- `MAX_SYMPTOMS` - Maximum symptoms per query
- `RATE_LIMIT` - API rate limiting

## Medical Disclaimer

**⚠️ IMPORTANT**: This symptom checker is for informational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment.

- Always consult a qualified healthcare provider for medical concerns
- In case of emergency, call your local emergency number immediately
- This tool does not provide medical diagnoses
- Results are AI-generated and may not apply to your specific situation
- Do not rely solely on this tool for health decisions

## Emergency Warning Signs

**Seek immediate medical attention if you experience:**
- Chest pain or pressure
- Difficulty breathing or shortness of breath
- Sudden severe headache
- Sudden confusion or trouble speaking
- Loss of consciousness
- Severe bleeding
- Signs of stroke (face drooping, arm weakness, speech difficulty)
- Suicidal thoughts

## Safety Features

The application includes multiple safety layers:
- **Input Validation**: Filters malicious or inappropriate input
- **Content Filtering**: Ensures appropriate medical responses
- **Rate Limiting**: Prevents API abuse
- **Error Handling**: Graceful degradation on failures
- **Sanitization**: Protects against injection attacks

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```

## Dependencies

Key dependencies include:
- `express` - Web server framework
- `dotenv` - Environment variable management
- `cors` - Cross-origin resource sharing
- AI/LLM SDK (specific to your provider)
- Input validation libraries

## Data Privacy

This application:
- Does not store personal health information permanently
- Uses encrypted connections (HTTPS in production)
- Follows HIPAA guidelines where applicable
- Implements secure API communication
- Provides data deletion options

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comprehensive comments
- Write unit tests for new features
- Ensure medical information is accurate
- Test safety features thoroughly
- Update documentation

## Troubleshooting

### Common Issues

**Server won't start:**
- Check if port 3000 is available
- Verify environment variables are set
- Ensure dependencies are installed

**LLM not responding:**
- Verify API key is valid
- Check internet connection
- Review rate limits

**Frontend not loading:**
- Clear browser cache
- Check console for errors
- Verify server is running
