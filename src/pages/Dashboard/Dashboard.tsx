import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const Dashboard: React.FC = () => {
  const mode = useSelector((state: RootState) => state.ThemeReducer.mode);
  return (
    <>
      <div
        className={`content ${
          mode === "dark" ? "content-dark" : "content-light"
        } `}
      >
        test
      </div>
    </>
  );
};

export default Dashboard;
