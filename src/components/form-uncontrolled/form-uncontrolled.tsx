import { GENDERS } from '@constants';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { add, selectAllCountries } from '@redux/userSlice';
import { PasswordStrengthSchema, UserSchema } from '@schemas';
import type { User } from '@ts-interfaces';
import { fileToBase64 } from '@utils';
import { useEffect, useRef, useState } from 'react';

type UserErrors = Partial<Record<keyof Omit<User, 'id'> | 'confirmPassword', string>>;

const PASSWORD_STRENGTH_MAP = {
  0: 'Strong',
  1: 'Medium',
  2: 'Medium',
  3: 'Medium',
  4: 'Weak',
};

export const FormUncontrolled: React.FC = () => {
  const [userErrors, setUserErrors] = useState<UserErrors>({});
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null);
  const firsInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);

  useEffect(() => {
    if (firsInputRef.current) {
      firsInputRef.current.focus();
    }
  }, []);

  let passwordStrengthMessage = '';
  if (passwordStrength !== null) {
    passwordStrengthMessage = `(${PASSWORD_STRENGTH_MAP[passwordStrength as 0 | 1 | 2 | 3 | 4]})`;
  }

  const saveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    if (
      e.nativeEvent instanceof SubmitEvent &&
      e.nativeEvent.submitter instanceof HTMLButtonElement &&
      e.nativeEvent.submitter.name === 'save'
    ) {
      const formData = new FormData(e.currentTarget);
      const rawData: Record<string, unknown> = Object.fromEntries(formData.entries());
      const imageFile = formData.get('image') as File | null;

      rawData.areTermsAccepted = rawData.areTermsAccepted !== undefined;

      if (imageFile?.size === 0) {
        rawData.image = null;
      } else {
        rawData.image = imageFile ?? null;
      }

      const result = UserSchema.safeParse(rawData);

      if (!result.success) {
        const errors: UserErrors = {};
        result.error.issues.forEach((issue) => {
          errors[issue.path[0] as keyof UserErrors] = issue.message;
        });
        setUserErrors(errors);
        e.preventDefault();
        return;
      }

      const validatedData = result.data;

      let base64Image = '';

      if (imageFile instanceof File) {
        base64Image = await fileToBase64(imageFile);
      }

      const user: User = {
        ...validatedData,
        id: crypto.randomUUID(),
        image: base64Image,
      };

      dispatch(add(user));
      setUserErrors({});
    }
  };

  const checkPasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = PasswordStrengthSchema.safeParse(e.target.value);

    if (!result.success) {
      setPasswordStrength(result.error.issues.length);
    } else {
      setPasswordStrength(0);
    }
  };

  return (
    <form method="dialog" className="window" onSubmit={(e) => void saveUser(e)}>
      <div className="title-bar">
        <div className="title-bar-text">Uncontrolled Form</div>
        <div className="title-bar-controls">
          <button type="submit" aria-label="Close" />
        </div>
      </div>

      <div className="window-body">
        <fieldset>
          <div className="field-row">
            <label className="w-[100px] font-bold" htmlFor="name">
              Name
            </label>
            <input ref={firsInputRef} type="text" id="name" name="name" autoComplete="given-name" />
          </div>
          <p className="h-[17px] text-red-800">{userErrors.name}</p>
          <div className="field-row">
            <label className="w-[100px] font-bold" htmlFor="age">
              Age
            </label>
            <input type="number" id="age" name="age" />
          </div>
          <p className="h-[17px] text-red-800">{userErrors.age}</p>
          <div className="field-row">
            <label className="w-[100px] font-bold" htmlFor="email">
              Email
            </label>
            <input type="email" id="email" name="email" autoComplete="email" />
          </div>
          <p className="h-[17px] text-red-800">{userErrors.email}</p>
          <div className="field-row">
            <label className="w-[100px] font-bold" htmlFor="country">
              Country
            </label>
            <input
              list="countryData"
              type="text"
              id="country"
              name="country"
              autoComplete="country"
            />
            <datalist id="countryData">
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </datalist>
          </div>
          <p className="h-[17px] text-red-800">{userErrors.country}</p>
          <div className="field-row">
            {GENDERS.map((gender) => (
              <div key={gender}>
                <input id={gender} type="radio" name="gender" value={gender} />
                <label className="font-bold" htmlFor={gender}>
                  {gender}
                </label>
              </div>
            ))}
          </div>
          <p className="h-[17px] text-red-800">{userErrors.gender}</p>
        </fieldset>
        <fieldset>
          <div className="">
            <label className="w-full font-bold" htmlFor="image">
              Upload Image
            </label>
            <input className="w-full" type="file" id="image" name="image" />
          </div>
          <p className="h-[17px] text-red-800">{userErrors.image}</p>
        </fieldset>
        <fieldset>
          <div className="field-row">
            <label className="w-[110px] font-bold" htmlFor="password">
              Password {passwordStrengthMessage}
            </label>
            <input
              className={`password-strength-${passwordStrength}`}
              onChange={checkPasswordStrength}
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
            />
          </div>
          <p className="h-[17px] text-red-800">{userErrors.password}</p>
          <div className="field-row">
            <label className="w-[110px] font-bold" htmlFor="password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
            />
          </div>
          <p className="h-[17px] text-red-800">{userErrors.confirmPassword}</p>
        </fieldset>
        <fieldset>
          <div className="">
            <input type="checkbox" id="areTermsAccepted" name="areTermsAccepted" />
            <label className="font-bold" htmlFor="areTermsAccepted">
              Accept the Terms and Conditions
            </label>
          </div>
          <p className="h-[17px] text-red-800">{userErrors.areTermsAccepted}</p>
        </fieldset>
      </div>

      <div className="window-body flex justify-around">
        <button className="font-bold" type="submit" aria-label="Cancel">
          Cancel
        </button>
        <button className="font-bold" name="save" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};
