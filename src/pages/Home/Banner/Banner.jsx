import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  default as img1,
  default as img2,
  default as img3,
  default as img4,
  default as img5,
  default as img6,
} from "../../../assets/Home/image3.png";

const Banner = () => {
  return (
    <>
      <Carousel>
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
        <div>
          <img src={img4} />
        </div>
        <div>
          <img src={img5} />
        </div>
        <div>
          <img src={img6} />
        </div>
      </Carousel>
    </>
  );
};

export default Banner;
