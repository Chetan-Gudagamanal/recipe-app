import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const useStyles = makeStyles((theme) => ({
    link: {
      display: "flex"
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20
    }
  }));
export default function NavBar(){
    const classes = useStyles();
    return(
        <ul
      style={{
        display: "flex",
        flexWrap: "nowrap",
        gap: "3em",
        listStyle: "none"
      }}
    >
      <li>
        <Link to="/">
          <span className="nav-link">
            <HomeIcon className={classes.icon} />
            Home
          </span>
        </Link>
      </li>
      <li>
        <Link to="/recipes">
          <span className="nav-link">
            <WhatshotIcon className={classes.icon} />
            All Recepes
          </span>
        </Link>
      </li>
      <li>
        <Link to="/add_recipe">
          <span className="nav-link">
            <InboxIcon />
            Add Recipe
          </span>
        </Link>
      </li>
    </ul>
    )
}