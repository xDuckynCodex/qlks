import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "1",
            amount: 150,
            status: "pending",
            email: "alice@example.com",
        },
        {
            id: "2",
            amount: 200,
            status: "processing",
            email: "bob@example.com",
        },
        {
            id: "3",
            amount: 300,
            status: "success",
            email: "charlie@example.com",
        },
        {
            id: "4",
            amount: 400,
            status: "failed",
            email: "david@example.com",
        },
        {
            id: "5",
            amount: 120,
            status: "pending",
            email: "eve@example.com",
        },
        {
            id: "6",
            amount: 350,
            status: "success",
            email: "frank@example.com",
        },
        {
            id: "7",
            amount: 180,
            status: "processing",
            email: "grace@example.com",
        },
        {
            id: "8",
            amount: 500,
            status: "failed",
            email: "henry@example.com",
        },
        {
            id: "9",
            amount: 220,
            status: "success",
            email: "irene@example.com",
        },
        {
            id: "10",
            amount: 140,
            status: "pending",
            email: "jack@example.com",
        },
        {
            id: "11",
            amount: 310,
            status: "processing",
            email: "kate@example.com",
        },
        {
            id: "12",
            amount: 275,
            status: "success",
            email: "leo@example.com",
        },
        {
            id: "13",
            amount: 90,
            status: "failed",
            email: "mike@example.com",
        },
        {
            id: "14",
            amount: 1000,
            status: "success",
            email: "nina@example.com",
        },
        {
            id: "15",
            amount: 60,
            status: "pending",
            email: "oscar@example.com",
        },
        {
            id: "16",
            amount: 720,
            status: "processing",
            email: "paul@example.com",
        },
        {
            id: "17",
            amount: 430,
            status: "success",
            email: "quincy@example.com",
        },
        {
            id: "18",
            amount: 330,
            status: "failed",
            email: "rachel@example.com",
        },
        {
            id: "19",
            amount: 250,
            status: "pending",
            email: "steve@example.com",
        },
        {
            id: "20",
            amount: 145,
            status: "success",
            email: "tina@example.com",
        },
    ];
}

export default async function DemoPage() {
    const data = await getData();

    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
