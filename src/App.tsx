import "./styles.css";
import { PasswordDialog } from "./components/page/password-dialog";
export default function App() {
  return (
    <div className="App">
      <PasswordDialog
        onSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onCancel={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
