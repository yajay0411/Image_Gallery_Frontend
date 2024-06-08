// import { CloudDownload } from "@material-ui/icons";
// import { useState } from "react";
import { useState } from "react";
import css from "./inifiniteImageScroll.module.css";
import { ArrowDownward } from "@material-ui/icons";
import { Grid, IconButton } from "@material-ui/core";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";

interface ImageDetails {
  likes?: number;
  downloads?: number;
  views?: number;
  webformatURL?: string;
  user?: string;
  userImageURL?: string;
  largeImageURL?: string;
  tags?: string;
}

const ImageCard = ({ image }: { image: ImageDetails }) => {
  const {
    likes,
    downloads,
    views,
    webformatURL,
    user,
    userImageURL,
    largeImageURL,
  } = image;

  const tags = image.tags && image.tags.split(",");
  const [imageHover, setImageHover] = useState(false);

  const downloadImage = async (url: string) => {
    try {
      await fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          console.log(blob);
          const blobUrl = window.URL.createObjectURL(new Blob([blob]));
          const fileName = url.split("get/")[1];
          console.log(`url`, blobUrl);
          const imageAnchorTag = document.createElement("a");
          imageAnchorTag.href = blobUrl;
          imageAnchorTag.setAttribute("download", fileName);
          document.body.appendChild(imageAnchorTag);
          imageAnchorTag.click();
          imageAnchorTag.remove();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const mode = useSelector((state: RootState) => state.ThemeReducer.mode);

  return (
    <>
      <div
        onMouseOver={() => {
          setImageHover(true);
        }}
        onMouseLeave={() => {
          setImageHover(false);
        }}
      >
        <div style={{ position: "relative" }}>
          <Grid container direction="column">
            <Grid item>
              <img src={webformatURL} alt="title" className={css["img"]} />
            </Grid>
            {imageHover && (
              <div className={css["download-btn-wrapper"]}>
                <Grid item>
                  <IconButton
                    onClick={() => {
                      if (largeImageURL) {
                        downloadImage(largeImageURL);
                      }
                    }}
                  >
                    <ArrowDownward />
                  </IconButton>
                </Grid>
              </div>
            )}
            {imageHover && (
              <Grid item>
                <Grid
                  container
                  justifyContent="flex-start"
                  alignItems="flex-end"
                  spacing={2}
                >
                  <div
                    className={`${css["hover-wrapper"]} ${
                      mode === "dark"
                        ? css["hover-bg-dark"]
                        : css["hover-bg-light"]
                    }`}
                  >
                    <Grid item>
                      <img
                        src={userImageURL}
                        alt="title"
                        className={css["image-uploader"]}
                      />
                    </Grid>
                    <Grid item>
                      <span>
                        <strong>{user}</strong>
                      </span>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={1}>
                        <Grid item>
                          <span>
                            <strong>Likes:</strong> {likes}
                          </span>
                        </Grid>
                        <Grid item>
                          <span>
                            <strong>Views:</strong> {views}
                          </span>
                        </Grid>
                        <Grid item>
                          <span>
                            <strong>Downloads:</strong> {downloads}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      {tags && tags.length > 0 && (
                        <Grid container spacing={2}>
                          {tags.map((tag, index) => (
                            <Grid item>
                              <span key={index}>
                                <span>{`#${tag.trim()}`}</span>
                              </span>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
