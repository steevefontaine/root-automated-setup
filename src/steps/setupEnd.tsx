import { memo, useContext } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/button";
import Section from "../components/section";
import { stepActiveContext } from "../components/stepList";
import { resetFlow } from "../features/flowSlice";
import { selectSetupParameters } from "../features/selectors";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ReactComponent as RestartIcon } from "../images/icons/restart.svg";

const SetupEndStep: React.FC = () => {
  const { playerOrder } = useAppSelector(selectSetupParameters);
  const dispatch = useAppDispatch();
  const stepActive = useContext(stepActiveContext);
  const { t } = useTranslation();
  return (
    <Section
      titleKey="setupStep.setupEnd.title"
      textKey="setupStep.setupEnd.body"
      translationOptions={{ count: playerOrder[0] }}
    >
      {stepActive ? (
        <Button Icon={RestartIcon} iconLeft={true} onClick={() => dispatch(resetFlow())}>
          {t("label.restartSetup")}
        </Button>
      ) : null}
    </Section>
  );
};

export default memo(SetupEndStep);
