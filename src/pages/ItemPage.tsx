import { useNavigate, useParams } from 'react-router-dom';
import EditModeButton from '../components/Buttons/IconButtons/EditModeButton';
import InfoElement from '../components/InfoElement';
import Modal from '../components/Modal';
import Page from '../components/Page/Page';
import { useItem } from '../hooks/useItem';
import { FaMoneyBillWave, FaWeightHanging } from 'react-icons/fa';
import Tag from '../components/Tag';

const ItemPage: React.FC = () => {
    const { id } = useParams();
    const { item, isLoading } = useItem(id);
    const navigate = useNavigate();

    return (
        <>
            <Page title={item?.title ?? ''} hasNavBack>
                {item && (
                    <>
                        <div className='absolute w-full'>
                            <Modal isVisible={isLoading} isSpinner />
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex'>
                                {item.tags?.map(tag => (
                                    <Tag key={tag} tagName={tag} />
                                ))}
                            </div>
                            <EditModeButton
                                onClick={() =>
                                    navigate(`/item/edit/${item.id}`)
                                }
                            />
                        </div>
                        <div
                            className='
                            flex 
                            flex-col md:flex-row 
                            md:items-center 
                            my-12
                        '>
                            <div className='flex justify-center mb-16 md:mb-0 md:mr-16'>
                                <img
                                    className='
                                w-44
                                h-44
                                rounded-md
                                '
                                    src={item.imageUrl}
                                    alt=''
                                />
                            </div>
                            <ul className='flex'>
                                <li>
                                    <InfoElement
                                        icon={<FaMoneyBillWave size={20} />}
                                        label='costs'
                                        value={`${item.price}€` ?? ''}
                                    />
                                </li>
                                <li>
                                    <InfoElement
                                        icon={<FaWeightHanging size={20} />}
                                        label='weight'
                                        value={`${item.weight}kg` ?? ''}
                                    />
                                </li>
                            </ul>
                        </div>
                        {/* 
                        {isEditMode && (
                            <button
                                onClick={() => {
                                    removeItem(item.id);
                                    navigate('/items');
                                }}>
                                delete item
                            </button>
                        )} */}
                    </>
                )}
            </Page>
        </>
    );
};

export default ItemPage;
