import Link from "next/link";
import Image from "next/image";
import classes from "./NotFound.module.css";
import img1 from "../public/data-not-found.ico";

const NotFound = () => {
  return (
    <div className={classes.countainer}>
      <div className={classes.header}>
        <h1>404</h1>
        <h3>Page NotFound!</h3>
      </div>
      <div className={classes.footer}>
        <p>
          We'r sorry, the page you requested could not be found. Please go back
          to the homepage!
        </p>
        <Link className={classes.btn} href='/'>
          GO HOME
        </Link>
      </div>
      
      <Image alt='notfound' src={img1}  />
    </div>
  );
};

export default NotFound;
