import { GENDERS, PASSWORD_STRENGTH_MAP } from '@constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { add, selectAllCountries } from '@redux/userSlice';
import { PasswordStrengthSchema, UserSchemaImagePreprocess } from '@schemas';
import type { User } from '@ts-interfaces';
import type { PasswordStrengthKey } from '@ts-types';
import { fileToBase64 } from '@utils';
import { useEffect, useRef, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

interface FormControlledProps {
  closeModal?: () => void;
}

export const FormControlled: React.FC<FormControlledProps> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ resolver: zodResolver(UserSchemaImagePreprocess), mode: 'onChange' });
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthKey | null>(null);
  const firsInputRef = useRef<HTMLInputElement>(null);
  const { ref, ...nameInputProps } = register('name');

  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);

  useEffect(() => {
    if (firsInputRef.current) {
      firsInputRef.current.focus();
    }
  }, []);

  let passwordStrengthMessage = '';
  if (passwordStrength !== null) {
    passwordStrengthMessage = `(${PASSWORD_STRENGTH_MAP[passwordStrength]})`;
  }

  const saveUser: SubmitHandler<{
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    gender: 'Male' | 'Female';
    image: File;
    areTermsAccepted: true;
  }> = async (data) => {
    const base64Image = await fileToBase64(data.image as unknown as File);
    const user: User = {
      ...data,
      id: crypto.randomUUID(),
      image: base64Image,
    };
    dispatch(add(user));
    reset();
    closeModal?.();
  };

  const checkPasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = PasswordStrengthSchema.safeParse(e.target.value);

    if (!result.success) {
      setPasswordStrength(result.error.issues.length as PasswordStrengthKey);
    } else {
      setPasswordStrength(0);
    }
  };

  return (
    <form className="window" onSubmit={(e) => void handleSubmit(saveUser)(e)}>
      <div className="title-bar">
        <div className="title-bar-text">Controlled Form</div>
        <div className="title-bar-controls">
          <button onClick={closeModal} type="button" aria-label="Close" />
        </div>
      </div>

      <div className="window-body">
        <fieldset>
          <div className="field-row">
            <label className="w-[100px] font-bold" htmlFor="name">
              Name
            </label>
            <input
              ref={(e) => {
                firsInputRef.current = e;
                ref(e);
              }}
              {...nameInputProps}
              type="text"
              id="name"
              autoComplete="given-name"
            />
          </div>
          <p className="h-[17px] text-red-800">{errors.name?.message}</p>
          <div className="field-row">
            <label className="w-[100px] font-bold" htmlFor="age">
              Age
            </label>
            <input {...register('age')} type="number" id="age" />
          </div>
          <p className="h-[17px] text-red-800">{errors.age?.message}</p>
          <div className="field-row">
            <label className="w-[100px] font-bold" htmlFor="email">
              Email
            </label>
            <input {...register('email')} type="email" id="email" autoComplete="email" />
          </div>
          <p className="h-[17px] text-red-800">{errors.email?.message}</p>
          <div className="field-row">
            <label className="w-[100px] font-bold" htmlFor="country">
              Country
            </label>
            <input
              {...register('country')}
              list="countryData"
              type="text"
              id="country"
              autoComplete="country"
            />
            <datalist id="countryData">
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </datalist>
          </div>
          <p className="h-[17px] text-red-800">{errors.country?.message}</p>
          <div className="field-row">
            {GENDERS.map((gender) => (
              <div key={gender}>
                <input {...register('gender')} id={gender} type="radio" value={gender} />
                <label className="font-bold" htmlFor={gender}>
                  {gender}
                </label>
              </div>
            ))}
          </div>
          <p className="h-[17px] text-red-800">{errors.gender?.message}</p>
        </fieldset>
        <fieldset>
          <div className="">
            <label className="w-full font-bold" htmlFor="image">
              Upload Image
            </label>
            <input {...register('image')} className="w-full" type="file" id="image" />
          </div>
          <p className="h-[17px] text-red-800">{errors.image?.message}</p>
        </fieldset>
        <fieldset>
          <div className="field-row">
            <label className="w-[110px] font-bold" htmlFor="password">
              Password {passwordStrengthMessage}
            </label>
            <input
              {...register('password')}
              className={`password-strength-${passwordStrength}`}
              onChange={checkPasswordStrength}
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </div>
          <p className="h-[17px] text-red-800">{errors.password?.message}</p>
          <div className="field-row">
            <label className="w-[110px] font-bold" htmlFor="password">
              Confirm Password
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
            />
          </div>
          <p className="h-[17px] text-red-800">{errors.confirmPassword?.message}</p>
        </fieldset>
        <fieldset>
          <div className="">
            <input {...register('areTermsAccepted')} type="checkbox" id="areTermsAccepted" />
            <label className="font-bold" htmlFor="areTermsAccepted">
              Accept the Terms and Conditions
            </label>
          </div>
          <p className="h-[17px] text-red-800">{errors.areTermsAccepted?.message}</p>
        </fieldset>
      </div>

      <div className="window-body flex justify-around">
        <button className="font-bold" onClick={closeModal} type="button" aria-label="Cancel">
          Cancel
        </button>
        <button disabled={!isValid} className="font-bold" name="save" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};
