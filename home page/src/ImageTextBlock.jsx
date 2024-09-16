import './ImageTextBlock.css';
import Image from './Image';

function ImageTextBlock(props) {
  const renderContent = () => {
    if (Array.isArray(props.content) && props.content.every(item => typeof item === 'object' && item.position && item.name)) {
      return (
        <ul>
          {props.content.map((member, index) => (
            <li key={index}>
              <strong>{member.position}</strong>: {member.name}
            </li>
          ))}
        </ul>
      );
    } 
    else if (typeof props.content === 'string') 
    {
      return <p>{props.content}</p>;
    }
    else 
    {
      return null; 
    }
  };

  return (
    <div className="image-text-block">
      <div className="image-container">
        <Image source={`${props.num}.jpg`} />
      </div>
      <div className="text-container">
        <h2>{props.title}</h2>
        {renderContent()}
      </div>
    </div>
  );
}

export default ImageTextBlock;
