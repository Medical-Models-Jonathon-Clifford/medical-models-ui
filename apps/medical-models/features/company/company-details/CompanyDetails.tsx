import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';
import { ViewCompanyDetailsDto } from '../../../types/dashboard';
import styles from './CompanyDetails.module.scss';

export function CompanyDetails({
  companyDetails,
}: {
  companyDetails: ViewCompanyDetailsDto | undefined;
}) {
  return (
    <Box>
      {companyDetails && companyDetails.logoFilename && (
        <Box>
          <Typography variant="h2">{companyDetails?.name}</Typography>
          <Stack direction="row" style={{ gap: '16px' }}>
            <Stack direction="column">
              <Typography variant="body1">
                Name:{' '}
                <span className={styles.important_text}>
                  {companyDetails?.name}
                </span>
              </Typography>
              <Typography variant="body1">
                State:{' '}
                <span className={styles.important_text}>
                  {companyDetails?.locationState}
                </span>
              </Typography>
            </Stack>
            <Box
              style={{
                width: 200,
                height: 200,
                borderWidth: 1,
                borderStyle: 'solid',
              }}
            >
              <Image
                width={198}
                height={198}
                src={`/images/${companyDetails?.logoFilename}`}
                alt={'Company logo'}
                priority
              />
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
