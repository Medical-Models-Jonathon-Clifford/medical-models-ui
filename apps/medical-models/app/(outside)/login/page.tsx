import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  Stack,
  TextField,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Title from '../../../components/title/Title';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import styles from './page.module.scss';
import { auth } from '../../../utils/auth';
import { DEMO_ACCOUNTS } from '../../../utils/demo-accounts';
import UserButton from '../../../components/user-button/user-button';

export default async function Login() {
  const session = await auth();

  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack spacing={3} direction={'column'}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <UserButton />
            <pre className="whitespace-pre-wrap break-all px-4 py-6">
              {JSON.stringify(session, null, 2)}
            </pre>
          </Paper>
          <Stack spacing={3} direction={'row'}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 450,
              }}
            >
              <Title>Login</Title>
              <Typography>
                Log in with your own account. Or, try a demo account from the
                side.
              </Typography>
              <TextField
                id="username-text-field"
                label="Username"
                variant="outlined"
              />
              <TextField
                id="password-text-field"
                type="password"
                label="Password"
                variant="outlined"
              />
              <Button>Login</Button>
            </Paper>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                width: '60%',
              }}
            >
              <Title>Demo Accounts</Title>

              <Typography>
                If you just want to try out the app, you can login to one of our
                demo accounts.
              </Typography>
              {DEMO_ACCOUNTS.map((account) => (
                <Paper key={account.centreName}>
                  <Typography>{account.centreName}</Typography>
                  <List dense={true}>
                    {account.users.map((user) => (
                      <ListItem
                        className={styles.login_page_creds_list_item}
                        key={user.name}
                      >
                        <ListItemAvatar>
                          <Avatar src={user.profilePicture}>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={user.role}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              ))}
            </Paper>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
