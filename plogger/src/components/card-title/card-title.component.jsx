import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import "./card-title.styles.scss";

const CardTitle = ({ title }) => {
  return (
    <div className="about-box">
      <FitnessCenterIcon style={{ marginRight: "12px" }} />
      <span className="title">{title}</span>
    </div>
  );
};

export default CardTitle;
