import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add Garment",
  title,
  onClose,
  name,
}) => {
  console.log("ModalWithForm");
  return (
    <div className={`modal modal__type_${name}`}>
      <div className="modal__content">
        <button type="button" onClick={onClose} />
        <h3>{title}</h3>
        <form>
          {children}
          <button type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;