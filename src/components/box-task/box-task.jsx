/**
 * External dependencies.
 */
import { useState } from 'react';
import classNames from 'classnames';
import SubmitImage from './SubmitImage';
import axiosInstance from '../../api/axiosInstance';



const BoxTask = ({ item, userInfo, refetch }) => {
    const {
        name,
        avatar_url: iconSrc,
        gold_reward,
        xp_reward,
        link,
        is_tg_group_joining_check,
        _id
    } = item;
    console.log(item)
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [image, setImage] = useState(null)

    const validationStatus = userInfo?.task_done?.find((t) => t.task_id === _id)?.validation_status ?
        userInfo?.task_done?.find((t) => t.task_id === _id)?.validation_status :
        null;

    const handleTaskClick = (id) => {
        // if (isLoading || isComplete) return;

        setIsLoading(true);
        setIsModalVisible(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsComplete(true);
        }, 30000);
    };
    console.log(validationStatus, "____", validationStatus === "validated")
    const closeModal = () => {
        event.stopPropagation();
        setIsModalVisible(false);

    };

    return (
        <div
            className={classNames('box-task', { 'is-loading': isLoading, 'is-complete': isComplete })}
            onClick={handleTaskClick}
        >
            <figure className="box__image">
                <img src={iconSrc ? `${import.meta.env.VITE_BACKEND_URL}${iconSrc}` : null} width="40" height="40" alt="" />
            </figure>

            <div className="box__content">
                <h6>{name}</h6>

                <ul>
                    <li>
                        <img src="/images/svg/ico-coin.svg" width="16" height="16" alt="" />
                        {gold_reward}
                    </li>

                    <li>
                        <img src="/images/svg/ico-xp.svg" width="30" height="16" alt="" />
                        {xp_reward}
                    </li>
                </ul>

            </div>

            <div className="box__loader">
                {validationStatus === "validated" ? <span className="box__checkmark"></span>:(validationStatus === "checked" || validationStatus === "unchecked") ? (
                    <img className="box__loader-icon" src="/images/svg/ico-loader.svg" width="28" height="28" alt="" />
                ):null}
            </div>
            {isModalVisible && (
                <div className="modal" onClick={(event) => event.stopPropagation()} >
                    <div className="modal__content">
                        <img src="/images/svg/ico-close.svg" width="43" height="43" alt="" onClick={closeModal} className="modal__close"/>
                        <h2>Complete this task</h2>
                        <div className='modal__content_divider' />
                        <div className='modal__content_box'>
                            <div className='modal__content_left'>
                                <figure className="box__image">
                                    <img src={iconSrc ? `${import.meta.env.VITE_BACKEND_URL}${iconSrc}` : null} width="40" height="40" alt="" />
                                </figure>
                                <div>
                                    <span>{name}</span>
                                    <ul>
                                        <li>
                                            <img src="/images/svg/ico-coin.svg" width="16" height="16" alt="" />
                                            {gold_reward}
                                        </li>
                                        <li>
                                            <img src="/images/svg/ico-xp.svg" width="30" height="16" alt="" />
                                            {xp_reward}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='modal__content_right'>
                                <a href={link}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <img src="/images/svg/ico-link.svg" width="30" height="30" alt="Share on Telegram" />
                                </a>
                            </div>

                        </div>
                        <div className='modal__submit'>
                            <p className='modal__submit_title'>
                                {!is_tg_group_joining_check?"Submit your proof":"Did you join our Telegram Group?"}</p>
                            <div className='modal__content_divider' />
                            {!is_tg_group_joining_check?(<span className='modal__submit_desc'>
                                Upload a screenshot with proof that you have completed this task.</span>):null}
                            <div>
                                <SubmitImage is_tg_group_joining_check={is_tg_group_joining_check} image={image} onChangeImage={
                                    (img) => { setImage(img) }
                                } onSubmit={async () => {

                                    const formData = new FormData();
                                    formData.append("task_id", _id);
                                    formData.append("telegram_id", userInfo?.telegram_id);
                                    if (!is_tg_group_joining_check && image) {
                                        formData.append("image", image);
                                    }

                                    const response = await axiosInstance.post('/tasks/proof-task', formData)
                                    if (response?.status === 200) {
                                        setImage(null)
                                        setIsModalVisible(false)
                                        refetch();
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoxTask;
