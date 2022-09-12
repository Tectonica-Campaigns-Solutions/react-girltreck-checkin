import CheckinForm from './CheckinForm';
import OverlayGrid from './OverlayGrid';
import "./styles/main.scss"


function App() {
  return (
    <div className="App">
      <OverlayGrid show={false} />
      <CheckinForm />
    </div>
  );
}

export default App;
