import Popular from './Popular'
import HeaderContent from './HeaderContent'
import BodyContent from './BodyContent'
import { motion } from 'framer-motion'


const Home = () => {
    return ( 
        <div className="home">
        <div className="header-page">
            <HeaderContent />
        </div>
        <motion.div
        animate={{opacity: 1}}
        initial={{opacity: 0}}
        exit={{opacity: 0}}
        transition={{duration: 0.5}}
        >
            <div className="body-page">
                <BodyContent />
            </div>
            <div className="footer">
                <Popular />
            </div>
        </motion.div>           
        </div>

     )
}
 
export default Home