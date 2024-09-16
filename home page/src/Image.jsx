import './Image.css';

function Image(props) {
  return (
    <img 
      src={`/assets/${props.source}`} 
      alt="Execom Member" 
      className="image-component"
    />
  );
}

export default Image;
