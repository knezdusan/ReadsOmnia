import List from "../components/List";
import styles from "../styles/Lists.module.scss";

const Lists = ({listsData}) => {

  delete listsData.default;

  return (
    <div className={styles.lists_box}>
      {Object.keys(listsData).map(key => <List key={key} listName={key} listData={listsData[key]} />)}
    </div>
  )
};

export default Lists;
