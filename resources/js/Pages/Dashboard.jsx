// material-ui
import StaticCard from "@/Components/Dashboard/Other/StaticCard";
import MainLayout from "@/Layouts/MainLayout/MainLayout";
import MainCard from "@/ui-component/cards/MainCard";
import EarningCard from "@/ui-component/cards/Skeleton/EarningCard";
import { Newspaper, Publish, Unpublished } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { IconUsers } from "@tabler/icons";
import { Head } from "@inertiajs/react";

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = (props) => (
    <MainLayout props={props}>
        <MainCard >
            <p className="mb-11 font-bold text-2xl w-full border-b-2 pb-2">Statistic</p>
            <Typography variant="body2" className="flex lg:flex-row flex-col justify-around gap-6">
            <Head title="Dashboard |" />
                <StaticCard title={"Total News Added"} subtitle={"news"} color={"blue"} total={props.all_news} Icon ={Newspaper} />
                <StaticCard title={"Total Published News"} subtitle={"news"} color={"green"} total={props.published_news} Icon={Publish}/>
                <StaticCard title={"Total Unpublished News"} subtitle={"news"} color={"red"} total={props.unpublished_news} Icon={Unpublished} />
                <StaticCard title={"Total Users"} subtitle={"user"} color={"indigo"} total={props.users} Icon={IconUsers} />
            </Typography>
        </MainCard>
    </MainLayout>
);

export default SamplePage;
