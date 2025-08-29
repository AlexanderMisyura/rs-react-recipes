import type { OptionalData } from '@ts-interfaces';

interface OptionalColumnSelectorProps {
  optionalData: OptionalData;
  updateOptionalData: (optionalData: OptionalData) => void;
  handleClose: () => void;
}

export const OptionalColumnSelector: React.FC<OptionalColumnSelectorProps> = ({
  optionalData,
  updateOptionalData,
  handleClose,
}) => {
  return (
    <div className="flex justify-center">
      <div className="message is-dark">
        <div className="message-header">Include additional data</div>
        <div className="message-body flex flex-col justify-center gap-4">
          <div className="checkboxes flex-col">
            {Object.keys(optionalData).map((key) => {
              return (
                <label className="checkbox! flex items-center gap-2" key={key}>
                  <input
                    type="checkbox"
                    defaultChecked={optionalData[key as keyof OptionalData]}
                    onChange={(e) => {
                      updateOptionalData({
                        ...optionalData,
                        [key]: e.target.checked,
                      });
                    }}
                  />
                  <span className="font-bold!">{key}</span>
                </label>
              );
            })}
          </div>
          <button className="button" type="button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
