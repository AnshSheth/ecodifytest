# OpenAI API Test with Next.js

This is a simple Next.js application to test the OpenAI API through Vercel. It includes a frontend with a text box to display the response from OpenAI's GPT-3.5 model.

## Features

- Simple UI with a button to test the OpenAI API
- Backend API route that makes a call to OpenAI's GPT-3.5 model
- Displays the response from OpenAI in a text box
- Error handling for API failures

## Getting Started

### Prerequisites

- Node.js 18.x or later
- An OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ecodify-openai-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

3. Click the "Test OpenAI API" button to make a request to the OpenAI API.

## Deployment on Vercel

1. Push your code to a GitHub repository.

2. Connect your repository to Vercel.

3. Add your OpenAI API key as an environment variable in the Vercel project settings.

4. Deploy the application.

## Troubleshooting

If you encounter issues with the OpenAI API:

1. Check that your API key is correctly set in the `.env.local` file or Vercel environment variables.
2. Verify that your OpenAI account has sufficient credits.
3. Check the browser console and server logs for error messages.

## License

This project is licensed under the MIT License.
