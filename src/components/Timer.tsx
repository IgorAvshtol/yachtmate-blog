import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';

import { eng, rus } from 'translation';

interface ITimer {
  seconds: number;
  setSeconds: (value: number) => void;
}

export const Timer = ({ seconds, setSeconds }: ITimer): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) clearInterval(myInterval);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
      <>
        {seconds === 0
            ? null
            : <Text ml='7px' fontWeight='500' fontSize='14px' lineHeight='140%' letterSpacing='0.7px'
                    color='rgba(0, 18, 64, 0.6)'>
              {t.enter_code_for_signup.send_again} {seconds} {t.enter_code_for_signup.seconds}
            </Text>
        }
      </>
  );
};
