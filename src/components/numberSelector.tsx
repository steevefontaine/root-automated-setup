import { useContext } from "react";
import { Trans } from "react-i18next";
import { selectSetupParameters } from "../features/selectors";
import { useAppSelector } from "../hooks";
import { StepContext } from "./step";

interface NumberSelectorProps {
  id: string;
  value: number;
  minVal: number;
  maxVal: number;
  onChange: (value: number) => void;
}

// This used to be dynamic but we've effectivley constrained this via CSS
const size = 2;

export const NumberSelector: React.FC<NumberSelectorProps> = ({
  id,
  value,
  minVal,
  maxVal,
  onChange,
}) => {
  const { errorMessage } = useAppSelector(selectSetupParameters);
  const { stepActive } = useContext(StepContext);

  const buttonHandler = (amount: number) => {
    const newValue = value + amount;
    if (newValue >= minVal && newValue <= maxVal) onChange(newValue);
  };

  const typingHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    let newValue = Number(rawValue);
    // Only continue processing if the user entered a numeric value
    if (!isNaN(newValue)) {
      // Trim off any extra numbers at the start of the input to allow numbers to be freely typed in
      // We do this in a loop so we keep cutting off leading digits until we get a valid value
      for (let digits = size; digits > 0; digits--) {
        newValue = Number(rawValue.substring(rawValue.length - digits));
        // Stop the loop once the value is small enough
        if (newValue <= maxVal) {
          // Only make the change if the value isn't too small
          if (newValue >= minVal) onChange(newValue);
          break;
        }
      }
    }
  };

  return (
    <div className="number-container">
      <label htmlFor={id} className="number-label">
        <Trans i18nKey={"label." + id} />
      </label>
      {stepActive ? (
        <>
          <button className="number-button" onClick={() => buttonHandler(-1)}>
            -
          </button>
          <input
            id={id}
            inputMode="numeric"
            className="number"
            value={value}
            size={size}
            onChange={typingHandler}
            aria-invalid={stepActive && errorMessage ? true : undefined}
            aria-errormessage={stepActive && errorMessage ? "appError" : undefined}
          />
          <button className="number-button" onClick={() => buttonHandler(+1)}>
            +
          </button>
        </>
      ) : (
        <span id={id} className="number-value">
          {value}
        </span>
      )}
    </div>
  );
};

export default NumberSelector;