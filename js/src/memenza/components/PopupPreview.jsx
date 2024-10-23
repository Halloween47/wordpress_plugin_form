import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import React, { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 600,
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const videos = ["https://samplelib.com/lib/preview/mp4/sample-5s.mp4"];

function PopupPreview() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isPlaying, setIsPlaying] = React.useState(
    Array(videos.length).fill(false),
  );
  const videoRefs = useRef([]);

  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    const playingStatus = [...isPlaying];

    if (video.paused) {
      video.play();
      playingStatus[index] = true;
    } else {
      video.pause();
      playingStatus[index] = false;
    }

    setIsPlaying(playingStatus);
  };

  return (
    <Box className="etape-video-boutons">
      <Button variant="outlined" onClick={handleOpen}>
        Prévisualisation
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              // backgroundColor: "#000000",
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Box>
          <Typography
            variant="h6"
            color="textPrimary"
            sx={{ textAlign: "center", p: 3 }}
          >
            Votre visuel
          </Typography>
          <Box sx={{ backgroundColor: "#000000" }}>
            <Grid justifyContent="center">
              {videos.map((src, index) => (
                <Grid
                  item
                  key={index}
                  xs={6}
                  sm={4}
                  //   md={3}
                  sx={{ backgroundColor: "orange", width: "100%" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      //   width: "100%",
                      width: "100%",
                      height: 300,
                      cursor: "pointer",
                      borderRadius: 2,
                      overflow: "hidden",
                      "&:hover .overlay": {
                        opacity: isPlaying[index] ? 0 : 1,
                      },
                    }}
                    onClick={() => handleVideoClick(index)}
                  >
                    <Box
                      component="video"
                      src={src}
                      ref={(el) => (videoRefs.current[index] = el)}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {!isPlaying[index] && (
                      <Box
                        className="overlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                          transition: "opacity 0.3s",
                          opacity: 1,
                        }}
                      >
                        <PlayArrowIcon sx={{ fontSize: 60, color: "#fff" }} />
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default PopupPreview;
