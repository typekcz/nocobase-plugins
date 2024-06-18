import { LoginOutlined } from '@ant-design/icons';
import { css, useAPIClient, useCurrentUserContext } from '@nocobase/client';
import { Button, Space } from 'antd';
import React, { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthAnonymousTranslation } from './locale';
import { Authenticator } from '@nocobase/plugin-auth/client';

export interface OIDCProvider {
  clientId: string;
  title: string;
}

export function useRedirect(next = '/admin') {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return useCallback(() => {
    navigate(searchParams.get('redirect') || '/admin', { replace: true });
  }, [navigate, searchParams]);
}

export const AnonymousButton = ({ authenticator }: { authenticator: Authenticator }) => {
  const { t } = useAuthAnonymousTranslation();
  const api = useAPIClient();
  const redirect = useRedirect();
  const { refreshAsync } = useCurrentUserContext();

  const login = async () => {
    await api.auth.signIn({}, authenticator.name);
    await refreshAsync();
    redirect();
  };

  return (
    <Space
      direction="vertical"
      className={css`
        display: flex;
      `}
    >
      <Button shape="round" block icon={<LoginOutlined />} onClick={login}>
        {t(authenticator.title)}
      </Button>
    </Space>
  );
};
