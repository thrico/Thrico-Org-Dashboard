import { Carousel } from "antd";
import React from "react";

const Preview = ({ list }) => {
  return (
    <Carousel style={{ width: "100%", height: "70vh" }}>
      {list?.map((set) => (
        <>
          {set && (
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  height: "70vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "70vh",
                    background: "#364d79",
                    backgroundImage: `url(${URL.createObjectURL(
                      set.url[0].originFileObj
                    )})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    filter: "blur(50px)",
                    zIndex: -1,
                  }}
                ></div>

                <img
                  width={"100%"}
                  height={"auto"}
                  src={URL.createObjectURL(set.url[0].originFileObj)}
                />
              </div>
            </div>
          )}{" "}
        </>
      ))}
    </Carousel>
  );
};

export default Preview;
