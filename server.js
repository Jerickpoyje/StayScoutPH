import app from './src/server-core.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express backend running on http://localhost:${PORT}`);
});
