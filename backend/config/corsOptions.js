const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests only from port 5173
  credentials: true, // Allow sending cookies
};

module.exports = corsOptions;
