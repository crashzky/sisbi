import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'placeholder'> {

}

export default Props;
