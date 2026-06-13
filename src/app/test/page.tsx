export default function TestPage() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>Test Page - Server Component</h1>
      <p>Cette page est un composant serveur pur (pas de 'use client').</p>
      <p>Si vous voyez ceci, le rendu serveur fonctionne.</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Retour accueil (lien HTML natif)</a>
    </div>
  );
}
