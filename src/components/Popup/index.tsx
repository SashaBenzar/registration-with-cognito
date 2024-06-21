import './style.css';

const Popup = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div className="popup">
      <section className="popup-main">
        <h2>success</h2>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Popup;
