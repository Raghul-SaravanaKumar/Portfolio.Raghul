const emojiMap = {
  '👋': '1f44b',
  '🚀': '1f680',
  '💬': '1f4ac',
  '🌤️': '1f324-fe0f',
  '🌤': '1f324-fe0f',
  '🎓': '1f393',
  '🚑': '1f691',
  '🩺': '1fa7a',
  '🏗️': '1f3d7-fe0f',
  '🛠️': '1f6e0-fe0f',
  '🛠': '1f6e0-fe0f',
  '🛡️': '1f6e1-fe0f',
  '🛡': '1f6e1-fe0f',
  '🧠': '1f9e0',
  '⚡': '26a1',
  '🗄️': '1f5c4-fe0f',
  '☁️': '2601-fe0f',
  '💼': '1f4bc',
  '✨': '2728',
  '📈': '1f4c8',
};

export default function AppleEmoji({ emoji, className = '', style = {} }) {
  const code = emojiMap[emoji.trim()];
  if (!code) {
    return <span className={className} style={style}>{emoji}</span>;
  }

  const src = `https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/${code}.png`;
  return (
    <img
      src={src}
      alt={emoji}
      className={`apple-emoji ${className}`}
      style={{
        display: 'inline-block',
        width: '1.2em',
        height: '1.2em',
        verticalAlign: '-0.25em',
        objectFit: 'contain',
        ...style
      }}
      loading="lazy"
    />
  );
}
