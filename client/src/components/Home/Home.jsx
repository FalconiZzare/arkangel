import React from "react";
import { Stack, Typography } from "@mui/material";
import Background from "../../assets/images/home_bg.jpg";
import Hero from "../../assets/images/hero.png";
import Logo from "../../assets/logo/arkangel_logo_orange_alpha.png";
import { COLORS } from "../../utils/GlobalColors";

const Home = () => {
  return (
    <Stack width={"100%"}>
      <Stack
        width={"100%"}
        height={"100vh"}
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Stack
          width={"100%"}
          height={"100%"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          spacing={10}
          sx={{
            backdropFilter: "blur(8px)"
          }}
        >
          <Stack
            width={"100%"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                fontSize: "56px",
                fontWeight: 800,
                color: COLORS.DarkGrey
              }}
            >
              Welcome To
            </Typography>
            <Stack
              width={{
                lg: "500px",
                xl: "620px"
              }}
            >
              <img src={Logo} alt={"Logo"} width={"100%"} />
            </Stack>
          </Stack>
          <Stack
            width={{
              lg: "600px",
              xl: "800px"
            }}
          >
            <img src={Hero} alt={"Hero"} width={"100%"} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
