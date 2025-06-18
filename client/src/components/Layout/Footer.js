import React from 'react';
import '../../assets/css/footer.css'

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Todolist for Tuoi Tre. Made with ❤️ by Huy2k4.</p>
    </footer>
  );
}
