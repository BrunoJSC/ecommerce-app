import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./Services.css";

import { motion } from "framer-motion";
import serviceData from "../assets/data/serviceData";

const Services = () => {
  return (
    <section className="services">
      <Container>
        <Row>
          {serviceData.map((item, index) => (
            <Col key={index} lg="3" md="4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="service__item"
                style={{ backgroundColor: `${item.bg}` }}
              >
                <span>
                  <i className={item.icon}></i>
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
