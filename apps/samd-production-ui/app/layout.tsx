import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {darkTheme} from "./darkTheme";
import {ThemeProvider} from "@mui/material/styles";
import Base from "./Base";

export const metadata = {
  title: 'CAPA Dashboard',
  description: 'Dashboard for managing CAPAs (Corrective and Preventative Actions)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const handleIcon = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Icon clicked');
  }

  return (
    <html lang="en">
      <body>
      <Base>{children}</Base>
      </body>
    </html>
  )
}
