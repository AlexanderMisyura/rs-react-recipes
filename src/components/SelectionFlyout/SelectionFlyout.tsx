import { Button, Flyout } from '@components';
import { useThemeContext } from '@hooks';
import { fileService } from '@services';
import { convertRecipesToCSV } from '@utils';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAllChecked, selectCheckedTotal, wipe } from 'redux/recipesSlice';

export const SelectionFlyout: React.FC = () => {
  const { theme } = useThemeContext();
  const allChecked = useAppSelector(selectAllChecked);
  const checkedTotal = useAppSelector(selectCheckedTotal);
  const dispatch = useAppDispatch();
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [downloadName, setDownloadName] = useState<string>('');

  useEffect(() => {
    if (checkedTotal) {
      const recipesCSVString = convertRecipesToCSV(allChecked);

      const { url, fileName } = fileService.createDownloadable(
        recipesCSVString,
        'text/csv',
        `${checkedTotal}-items.csv`
      );

      setDownloadUrl(url);
      setDownloadName(fileName);

      return () => {
        URL.revokeObjectURL(url);
        setDownloadUrl('');
        setDownloadName('');
      };
    }
  }, [allChecked, checkedTotal]);

  return (
    <Flyout isOpen={checkedTotal > 0}>
      <div className="flex flex-col items-center gap-2">
        <h3 className={clsx(`${theme}-text`, 'font-semibold')}>
          {`${checkedTotal} ${checkedTotal === 1 ? 'Recipe' : 'Recipes'} Checked`}
        </h3>
        <Button className="px-3 py-1.5 text-sm" onClickHandler={() => dispatch(wipe())}>
          Unselect All
        </Button>
        <a
          href={downloadUrl}
          download={downloadName}
          className={clsx(
            'flex items-center gap-4 px-3 py-1.5 text-sm',
            'cursor-pointer rounded-md border-2 border-transparent text-center font-bold tracking-wide text-orange-900 shadow-sm select-none',
            'active:shadow-inner',
            `${theme}-button`,
            'transition-colors'
          )}
        >
          Download
        </a>
      </div>
    </Flyout>
  );
};
