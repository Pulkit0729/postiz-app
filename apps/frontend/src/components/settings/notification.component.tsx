import { Checkbox } from '@gitroom/react/form/checkbox';
import React, { useCallback, useEffect, useState } from 'react';
import { mutate } from 'swr';
import { useUser } from '../layout/user.context';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';

function NotificationCheckbox() {
  const user = useUser();
  const fetch = useFetch();
  const [isChecked, setIsChecked] = useState(false);

  const toggleEmailNotification = useCallback(async () => {
    if (!user || Object.keys(user).length === 0) return;

    const newSetting = !isChecked;
    setIsChecked(newSetting);

    await fetch(`/settings/email-notifications`, {
      method: 'POST',
      body: JSON.stringify({ emailNotifications: newSetting }),
    });

    // mutate(
    //   '/user/self',
    //   {
    //     ...user,
    //     emailNotifications: newSetting,
    //   },
    //   {
    //     revalidate: true,
    //   }
    // );
  }, [user, isChecked, fetch]);

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) return;
    setIsChecked(user.emailNotifications);
  }, [user, setIsChecked]);

  return (
    <div className="flex gap-[16px]">
      <div>
        <Checkbox
          disableForm={true}
          checked={isChecked}
          name="Send Email"
          onChange={toggleEmailNotification}
        />
      </div>
      <div>Email Notification</div>
    </div>
  );
}

export default NotificationCheckbox;
