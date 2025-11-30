# CapitaCare 💰

A comprehensive expense tracking application that helps you manage your finances with intelligent receipt scanning and powerful analytics.

## ✨ Features

### Authentication & Security
- **User Authentication**: Secure sign up and login system using JWT tokens
- **User-specific Data**: All transactions and data are isolated per user account

### Transaction Management
- **Add Transactions**: Record income or expenses with detailed information
  - Transaction type (income/expense)
  - Amount
  - Category
  - Date
  - Optional notes
- **Edit Transactions**: Update transaction details anytime
- **Delete Transactions**: Remove unwanted transactions
- **Paginated Transaction List**: Browse through your transaction history efficiently

### Financial Dashboard
- **Current Balance**: Real-time view of your available funds
- **Total Income**: Sum of all income transactions
- **Total Expenses**: Sum of all expense transactions
- **Visual Analytics**:
  - Category-wise pie/donut chart for spending breakdown
  - Time-series chart to track balance trends over time

### Advanced Features
- **Smart Receipt Scanning**: Upload receipt images and let Gemini AI automatically extract and fill transaction details
- **Flexible Filtering**: Filter transactions by:
  - Date range
  - Transaction type (income/expense)
- **CSV Export**: Download your transaction history for external analysis or record-keeping

### Data Persistence
- **MongoDB Integration**: All data is securely stored and persisted in MongoDB
- **User-specific Storage**: Each user's financial data is completely isolated and secure

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance
- Gemini API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yashi-15/CapitaCare.git
cd CapitaCare
```

2. Install dependencies and start the frontend
```bash
npm install
npm run dev
```
3. Move to backend directory
```bash
cd CapitaCare-backend
npm install
```

4. Set up environment variables

Create a `.env` file in the CapitaCare-backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

4. Start the backend
```bash
npm run dev
```

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **AI Integration**: Google Gemini API

## 📊 Usage

1. **Sign Up/Login**: Create an account or log in to access your dashboard
2. **View Dashboard**: Monitor your financial summary with charts and statistics
3. **Add Transactions**: 
   - Manually enter transaction details, or
   - Upload a receipt image for automatic data extraction
4. **Filter & Search**: Use filters to find specific transactions
5. **Export Data**: Download your transaction history as CSV when needed

## 🤖 AI-Powered Receipt Scanning

CapitaCare leverages Google's Gemini AI to intelligently scan receipt images and extract:
- Merchant name
- Transaction amount
- Date
- Category (auto-suggested)
- Line items (if available)

Simply upload a clear photo of your receipt, and the AI will populate the transaction form automatically!

## 📈 Future Enhancements

- Budget planning and alerts
- Recurring transaction support
- Multi-currency support
- Mobile application
- Expense sharing with family members

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**CapitaCare** - Take care of your capital, one transaction at a time! 💵

### Yashi Sharma