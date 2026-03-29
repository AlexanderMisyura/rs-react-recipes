'use client';

import { Button, Flyout } from '@components';
import { Link } from '@i18n/navigation';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { clear, selectAllChecked, selectCheckedTotal } from '@redux/recipesSlice';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export const SelectionFlyout: React.FC = () => {
  const t = useTranslations('SelectionFlyout');
  const allChecked = useAppSelector(selectAllChecked);
  const checkedTotal = useAppSelector(selectCheckedTotal);
  const dispatch = useAppDispatch();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [urlToRevoke, setUrlToRevoke] = useState<string>('');

  useEffect(() => {
    URL.revokeObjectURL(urlToRevoke);
  }, [urlToRevoke]);

  const downloadCsv = async () => {
    setIsDownloading(true);

    const response = await fetch('/api/csv-generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipes: allChecked, fileName: `${checkedTotal}-items` }),
    });

    if (response.ok) {
      const blobData = await response.blob();
      const url = URL.createObjectURL(blobData);
      const fileName = response.headers.get('Content-Disposition')?.split('"')[1];

      if (!linkRef.current) {
        setIsDownloading(false);
        return;
      }

      linkRef.current.href = url;
      linkRef.current.download = fileName ?? `${checkedTotal}-items`;
      linkRef.current.click();
      setUrlToRevoke(url);
    }

    setIsDownloading(false);
  };

  return (
    <Flyout isOpen={checkedTotal > 0}>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text font-semibold">{`${t('selected')}: ${checkedTotal}`}</h3>
        <Button className="w-full px-3 py-1.5 text-sm" onClickHandler={() => dispatch(clear())}>
          {t('unselect')}
        </Button>
        <Button
          onClickHandler={() => {
            void downloadCsv();
          }}
          disabled={isDownloading}
          className="w-full px-3 py-1.5 text-sm"
        >
          {t('download')}
        </Button>
        <Link className="hidden" ref={linkRef} href="" />
      </div>
    </Flyout>
  );
};
