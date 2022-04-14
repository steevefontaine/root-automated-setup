import {
  enableMapLandmark,
  fixFirstPlayer,
  selectExpansionArray,
  selectFactionArray,
  selectFlowState,
  selectLandmarkMaps,
  selectMapArray,
  selectSetupParameters,
  setPlayerCount,
  skipSteps,
  toggleExpansion,
  toggleMap,
} from "../../features";
import { SetupStep } from "../../types";
import Checkbox from "../checkbox";
import ComponentList from "../componentList";
import { useAppDispatch, useAppSelector } from "../hooks";
import NumberSelector from "../numberSelector";
import Radiogroup from "../radiogroup";
import Step from "../step";
import styles from "./stepList.module.css";

export const StepList: React.FC = () => {
  const { skippedSteps } = useAppSelector(selectFlowState);
  const { map, useMapLandmark, fixedFirstPlayer, playerCount } = useAppSelector(
    selectSetupParameters
  );
  const landmarkMaps = useAppSelector(selectLandmarkMaps);
  const factions = useAppSelector(selectFactionArray);
  const dispatch = useAppDispatch();

  return (
    <main className={styles.container}>
      <Step step={SetupStep.chooseExpansions}>
        <ComponentList
          selector={selectExpansionArray}
          toggleComponent={(expansion) =>
            dispatch(toggleExpansion(expansion.code))
          }
          getTooltipKey={(expansion) => `expansion.${expansion.code}`}
          isLocked={(expansion) => expansion.base}
        />
        <Checkbox
          id="includeBotStep"
          defaultValue={!skippedSteps[SetupStep.setUpBots]}
          onChange={(checked) =>
            dispatch(skipSteps(SetupStep.setUpBots, !checked))
          }
        />
      </Step>
      <Step step={SetupStep.chooseMap}>
        <ComponentList
          selector={selectMapArray}
          toggleComponent={(map) => dispatch(toggleMap(map.code))}
          getTooltipKey={(map) => `map.${map.code}.name`}
        />
        {landmarkMaps.length > 0 ? (
          <Checkbox
            id="useMapLandmark"
            defaultValue={useMapLandmark}
            onChange={(checked) => dispatch(enableMapLandmark(checked))}
          />
        ) : null}
      </Step>
      <Step
        step={SetupStep.setUpMap}
        subtitleKey={`map.${map?.code}.setupTitle`}
        textKey={`map.${map?.code}.setupText`}
      />
      <Step
        step={SetupStep.setUpMapLandmark}
        subtitleKey={`map.${map?.code}.landmarkSetupTitle`}
        textKey={`map.${map?.code}.landmarkSetupText`}
      />
      <Step step={SetupStep.setUpBots} />
      <Step step={SetupStep.seatPlayers}>
        <NumberSelector
          id="playerCount"
          value={playerCount}
          minVal={1}
          maxVal={factions.length - 1}
          onChange={(value) => dispatch(setPlayerCount(value))}
        />
        <Radiogroup
          id="fixedFirstPlayer"
          defaultValue={fixedFirstPlayer}
          onChange={(value) => dispatch(fixFirstPlayer(value))}
        />
      </Step>
      <Step step={SetupStep.chooseLandmarks}></Step>
      <Step step={SetupStep.setUpLandmark1}></Step>
      <Step step={SetupStep.setUpLandmark2}></Step>
      <Step step={SetupStep.chooseHirelings}></Step>
      <Step step={SetupStep.setUpHireling1}></Step>
      <Step step={SetupStep.setUpHireling2}></Step>
      <Step step={SetupStep.setUpHireling3}></Step>
      <Step step={SetupStep.postHirelingSetup}></Step>
      <Step step={SetupStep.chooseDeck}></Step>
      <Step step={SetupStep.drawCards}></Step>
      <Step step={SetupStep.chooseFactions}></Step>
      <Step step={SetupStep.selectFaction}></Step>
      <Step step={SetupStep.setUpFaction}></Step>
      <Step step={SetupStep.placeScoreMarkers}></Step>
      <Step step={SetupStep.chooseHand}></Step>
      <Step step={SetupStep.setupEnd}></Step>
    </main>
  );
};