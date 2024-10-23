import * as React from 'react';
import Title from './Title';
import DielectricPropsBodyTissues from "./DielectricPropsBodyTissues";
import BpPulseWave from "./BpPulseWave";
import ThoracicImpedance from "./ThoracicImpedance";

export default function NewModelSelection() {

  return (
    <React.Fragment>
      <Title>New Model</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <DielectricPropsBodyTissues></DielectricPropsBodyTissues>
        <BpPulseWave></BpPulseWave>
        <ThoracicImpedance></ThoracicImpedance>
      </div>
    </React.Fragment>
  );
}
