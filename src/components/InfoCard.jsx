function InfoCard({ title, value, unit, status }) {
  return (
    <div className={`info-card ${status}`}>
      <p>{title}</p>
      <h2>
        {value} <span>{unit}</span>
      </h2>
    </div>
  );
}

export default InfoCard;
