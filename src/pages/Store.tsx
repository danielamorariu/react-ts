import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/Store/StoreItem.tsx"
import storeItems from "../data/items.json"

export function Store() {
    return (
        <>
            <h1 className="me-auto">Store</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems.map(item => (
                    <Col key={item.id}>
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}
