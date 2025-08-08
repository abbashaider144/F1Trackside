# Setup Guide for Lenovo ThinkPad T420

This guide will help you set up and run the project on your Lenovo ThinkPad T420 running Windows.

## Prerequisites

### 1. Install Visual Studio Code
1. Go to [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Click the "Download for Windows" button
3. Run the downloaded installer (`.exe` file)
4. Follow the installation wizard
5. Launch Visual Studio Code

### 2. Install Node.js
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the setup wizard
4. Verify installation by opening Command Prompt and running:
   ```bash
   node --version
   npm --version
   ```

### 3. Install Git (if not already installed)
1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download the Windows version
3. Run the installer with default settings
4. Verify installation:
   ```bash
   git --version
   ```

## Project Setup

### 1. Extract the Project Folder
1. Copy the project folder to your computer (e.g., to `C:\Projects\` or your Documents folder)
2. Extract the folder if it's compressed

### 2. Open the Project in Visual Studio Code
1. Launch Visual Studio Code
2. Go to `File` → `Open Folder`
3. Navigate to and select your project folder
4. Click `Select Folder`

### 3. Install Dependencies
1. Open the integrated terminal in VS Code:
   - Press `Ctrl + `` (backtick) or go to `Terminal` → `New Terminal`
2. Make sure you're in the project directory
3. Run the following command to install all dependencies:
   ```bash
   npm install
   ```
4. Wait for the installation to complete (this may take a few minutes)

### 4. Set Up Environment Variables
1. In the project root, create a new file called `.env.local`
2. Add the following environment variables (you'll need to get these values from the project owner):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_MOCK_DATA=false
   ```

### 5. Run the Development Server
1. In the terminal, run:
   ```bash
   npm run dev
   ```
2. Wait for the server to start (you'll see a message like "Ready - started server on 0.0.0.0:3000")
3. Open your web browser and go to `http://localhost:3000`

## Troubleshooting

### Common Issues and Solutions

#### 1. "npm is not recognized"
- **Solution**: Restart your computer after installing Node.js, or add Node.js to your PATH manually

#### 2. "Port 3000 is already in use"
- **Solution**: Either:
  - Close other applications using port 3000
  - Or run: `npm run dev -- -p 3001` to use a different port

#### 3. "Module not found" errors
- **Solution**: Delete the `node_modules` folder and `package-lock.json`, then run `npm install` again

#### 4. Slow performance on ThinkPad T420
- **Solutions**:
  - Close unnecessary applications
  - Ensure you have at least 4GB of RAM available
  - Consider upgrading to an SSD if you haven't already
  - Close browser tabs you're not using

#### 5. Git authentication issues
- **Solution**: Configure Git with your credentials:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

### Performance Tips for ThinkPad T420

1. **Close unnecessary background applications**
2. **Disable Windows visual effects**:
   - Right-click on Desktop → Personalize → Themes → Advanced appearance settings
   - Choose "Adjust for best performance"

3. **Ensure adequate disk space** (at least 2GB free)

4. **Update Windows** to ensure you have the latest drivers

## Available Scripts

Once the project is running, you can use these commands in the terminal:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run code linting
- `npm run test` - Run tests

## Getting Help

If you encounter any issues:

1. Check the terminal output for error messages
2. Make sure all prerequisites are installed correctly
3. Verify that you're in the correct project directory
4. Contact the project owner for environment variable values
5. Check the [Next.js documentation](https://nextjs.org/docs) for more information

## System Requirements

- **OS**: Windows 7 or later
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 2GB free space
- **Browser**: Chrome, Firefox, or Edge (latest version)

## Notes for ThinkPad T420

- The T420 is an older laptop, so performance may be slower than modern machines
- Consider running the development server with reduced features if performance is poor
- The built-in graphics should be sufficient for web development
- If you experience overheating, ensure proper ventilation and consider using a laptop cooling pad

---

**Good luck with your development!** 🚀 