import "./metadata-row.styles.scss";

const MetadataRow = (props) => {
  return (
    <div className="metadata-row">
      {props.tags.map((item, i) => {
        return (
          <div key={i} className="metadata-tag">
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default MetadataRow;
