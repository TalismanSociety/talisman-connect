import './DummyComponent.module.css';

/* eslint-disable-next-line */
export interface DummyComponentProps {}

export function DummyComponent(props: DummyComponentProps) {
  return (
    <div>
      <h1>Welcome to DummyComponent!</h1>
    </div>
  );
}

export default DummyComponent;
